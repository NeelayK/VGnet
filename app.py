from flask import Flask, jsonify
from flask_cors import CORS
from supabase import create_client


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


SUPABASE_URL = "https://prfkhjuujnheztwhwmcd.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZmtoanV1am5oZXp0d2h3bWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDk2NjIsImV4cCI6MjA1NzM4NTY2Mn0.j92nEtB5mUORV5VlCpLsTbJNinSykjnpaX0R1cnZQXc"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/publications', methods=['GET'])
def get_publications():
    try:
        response = supabase.table('publications').select('*').order('id', desc=False).limit(10).execute()
        return jsonify(response.data)
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/projects', methods=['GET'])
def get_projects():
    try:
        response = supabase.table('projects').select('*').execute()
        return jsonify(response.data)
    except Exception as e:
        print(f"Error fetching data: {e}") 
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/collabs', methods=['GET'])
def get_collabs():
    try:
        response = supabase.table('collabs').select('*').execute()
        return jsonify(response.data)
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500



@app.route('/team', methods=['GET'])
def get_team():
    try:
        response = supabase.table('team').select('*').execute()
        return jsonify(response.data)
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

