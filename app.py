# Import Flask
from flask import Flask, jsonify, render_template

# Python SQL Toolkit and Object Relational Mapper
# Connect to the PostgreSQL database server in the Python program using the psycopg database adapter
import psycopg2

# Database Setup
# Reference: https://www.postgresqltutorial.com/postgresql-python/connect/

conn = psycopg2.connect(
    host="localhost",
    database="happiness_db",
    user="postgres",
    password="rootroot")

mycursor = conn.cursor()

# # Flask Setup
app = Flask(__name__, static_url_path = '/static')

@app.route('/', methods=['post', 'get'])
def index ():
    return render_template('index.html')

@app.route('/data', methods=['post', 'get'])
def happiness():
        mycursor.execute("SELECT * FROM v_world_happiness")
        data = mycursor.fetchall()
        return render_template("data.html", data=data)

# route place holder for Leaflet and add another one for D3
@app.route('/comparison') 
def comparison():
    return render_template('comparison.html')

# # Define Main Behavior
if __name__ == '__main__':
    app.run(debug=True)