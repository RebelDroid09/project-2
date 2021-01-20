import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:LifeAfterSql0@localhost/project2_db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Corruption_Perception = Base.classes.corruption_perception
Country_Lat_Lon = Base.classes.country_lat_lon
World_Happiness = Base.classes.world_happiness

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return

@app.route("/heatmapData", methods=['GET', 'POST'])
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    latlonResults = session.query(Country_Lat_Lon.id, Country_Lat_Lon.country_cd, Country_Lat_Lon.latitude, Country_Lat_Lon.longitude, Country_Lat_Lon.country).all()
    corruptionResults = session.query(Corruption_Perception.id, Corruption_Perception.year_, Corruption_Perception.country, Corruption_Perception.iso3, Corruption_Perception.cpi_score, Corruption_Perception.ranking).all()
    happinessResults = session.query(World_Happiness.id, World_Happiness.year_, World_Happiness.ranking, World_Happiness.country, World_Happiness.score, World_Happiness.gdp_per_capita, World_Happiness.social_support, World_Happiness.healthy_life_expectancy, World_Happiness.freedom_to_make_life_choices, World_Happiness.generosity, World_Happiness.perceptions_of_corruption).all()

    allLatLonResults = []
    allCorruptionResults = []
    allHappinessResults = []

    results = []

    session.close()

    #Rolling all tables into defined objects, which should facilitate JSON serialization
    for id, country_cd, latitude, longitude, country in latlonResults:
        latlon_dict = {}
        latlon_dict["id"] = id
        latlon_dict["country_cd"] = country_cd
        latlon_dict["latitude"] = latitude
        latlon_dict["longitude"] = longitude
        latlon_dict["country"] = country
        allLatLonResults.append(latlon_dict)

    for id, year_, country, iso3, cpi_score, ranking in corruptionResults:
        corrupt_dict = {}
        corrupt_dict["id"] = id
        corrupt_dict["country_cd"] = country_cd
        corrupt_dict["latitude"] = latitude
        corrupt_dict["longitude"] = longitude
        corrupt_dict["country"] = country
        allCorruptionResults.append(corrupt_dict)

    for id, year_, ranking, country, score, gdp_per_capita, social_support, healthy_life_expectations, freedom_to_make_life_choices, generosity, perceptions_of_corruption in happinessResults:
        happiness_dict = {}
        happiness_dict["id"] = id
        happiness_dict["year"] = year_
        happiness_dict["ranking"] = ranking
        happiness_dict["country"] = country
        happiness_dict["score"] = score
        happiness_dict["gdp_per_capita"] = gdp_per_capita
        happiness_dict["social_support"] = social_support
        happiness_dict["healthy_life_expectations"] = healthy_life_expectations
        happiness_dict["freedom_to_make_life_choices"] = freedom_to_make_life_choices
        happiness_dict["generosity"] = generosity
        happiness_dict["perceptions_of_corruption"] = perceptions_of_corruption
        allHappinessResults.append(happiness_dict)

    #Combine all results into one object
    results = [allLatLonResults, allCorruptionResults, allHappinessResults]

    return jsonify(results)

@app.route("/heatmap")
def heatmap():

    return render_template('heatmap.html')

if __name__ == '__main__':
    app.run(debug=True)
