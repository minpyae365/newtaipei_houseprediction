import json
import pickle
import numpy as np

import warnings
warnings.filterwarnings('ignore')


__locations = None
__data_columns = None
__material = None
__propertytype = None
__model = None



def get_estimated_price(district,properties,material,Barea,rooms,livingR,bath):
    try:
        loc_index = __data_columns.index(district.lower())
        property_index = __data_columns.index(properties.lower())
        material_index = __data_columns.index(material.lower())

    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = Barea
    x[1] = rooms
    x[2] = livingR
    x[3] = bath
    if loc_index >= 0:
        x[loc_index] = 1
    if property_index >= 0:
        x[property_index] = 1
    if material_index >= 0:
        x[material_index] = 1

    return round(np.exp(__model.predict([x])[0]),2)


def get_district_names():
    return __locations

def get_material():
    return __material

def get_propertytype():
    return __propertytype

def load_saved_files():
    print('Loading files.....')
    global __data_columns
    global __locations
    global __propertytype
    global __material
    global __model

    with open('./../model/columns.json','r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[6:32] #26
        __propertytype = __data_columns[33:37]
        __material = __data_columns[38:]

    with open('./../model/home_prices_model.pickle','rb') as f:
        __model = pickle.load(f)
    print('loading files DONE!')


if __name__ == '__main__':
    load_saved_files()
    #print(get_district_names())
    #print(get_estimated_price('District_三峽區','PropertyType_套房','MainMaterial_加強磚造',150,1,1,1))
    #print(get_estimated_price('District_三峽區','PropertyType_華廈','MainMaterial_磚造',150,1,1,1))