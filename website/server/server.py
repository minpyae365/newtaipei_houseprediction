from flask import Flask, request, jsonify, render_template
import util


app = Flask(__name__)


@app.route('/hello')
def hello():
    return 'Hi'

@app.route('/get_district_names', methods=['GET'])
def get_district_names():
    response = jsonify({
        'Districts': util.get_district_names(),
        'Materials': util.get_material(),
        'PropertyType' : util.get_propertytype()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    Barea = float(request.form['Barea'])
    district = request.form['district']
    rooms = int(request.form['rooms'])
    livingR = int(request.form['livingR'])
    bath = int(request.form['bath'])
    properties = request.form['properties']
    material = request.form['material']


    response = jsonify({
        'estimated_price': util.get_estimated_price(district,properties,material,Barea,rooms,livingR,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response



if __name__ == '__main__':
    print('Starting Python Flask server for house Price prediction......')
    util.load_saved_files()
    app.run()