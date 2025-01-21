import csv
from datetime import datetime
import os

def save_contact_data(name, email, subject, message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    csv_file = os.path.join(data_dir, 'contact_data.csv')
    
    # Create data directory if it doesn't exist
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    
    # Create CSV file with headers if it doesn't exist
    if not os.path.exists(csv_file):
        with open(csv_file, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['Timestamp', 'Name', 'Email', 'Subject', 'Message'])
    
    # Append new contact data
    with open(csv_file, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, name, email, subject, message])

# Function to read all contact submissions
def read_contact_data():
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    csv_file = os.path.join(data_dir, 'contact_data.csv')
    
    if not os.path.exists(csv_file):
        return []
    
    contacts = []
    with open(csv_file, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            contacts.append(row)
    
    return contacts
