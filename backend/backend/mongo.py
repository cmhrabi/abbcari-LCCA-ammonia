from os import environ
from pymongo import MongoClient
from pymongo.server_api import ServerApi

from dotenv import load_dotenv
load_dotenv()

class Mongo():
    """MongoDB client for the application."""
    def __init__(self):
        self.client = self.get_mongo_client()
        self.db = self.get_database()

    def get_mongo_client(self):
        mongo_uri = environ.get("MONGO_URI")
        if not mongo_uri:
            raise ValueError("MONGO_URI environment variable is not set.")
        
        return MongoClient(mongo_uri, server_api=ServerApi(
            version='1', strict=True, deprecation_errors=True))

    def get_database(self):
        client = self.get_mongo_client()
        db_name = environ.get("MONGO_DB_NAME", "default_db")
        return client[db_name]
    
    def get_collection(self, collection_name):
        """Get a collection from the database."""
        if not self.db:
            raise ValueError("Database is not initialized.")
        
        return self.db[collection_name]
    
    def close(self):
        """Close the MongoDB client connection."""
        if self.client:
            self.client.close()
            self.client = None
            self.db = None
        else:
            raise ValueError("MongoDB client is not initialized.")