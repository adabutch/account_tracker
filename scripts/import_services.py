#!/usr/bin/env python3
"""
# License: MIT
# Description:
# Import a list of services from a google spreadsheet
# that currently tracks this information
"""
import csv
import sys
import os
import urllib.request
import json

# allow access to django environment
import django
sys.path.append(os.path.dirname(os.getcwd()))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "account_tracker.settings")
django.setup()
# via: https://stackoverflow.com/questions/39723310/django-standalone-script

# could also do:
# python manage.py runscript [scriptname] --traceback
# https://django-extensions.readthedocs.io/en/latest/runscript.html

from service.models import Service
from default_profile.models import DefaultProfile

departments = ''
address = "https://bloomington.in.gov/timetrack/DepartmentService"
with urllib.request.urlopen(address) as url:
    departments = json.loads(url.read().decode())

print(departments)

source_csv = "services.csv"
with open(source_csv) as csvfile:
    csv_reader = csv.reader(csvfile, dialect=csv.excel)
    count = 1
    for row in csv_reader:
        print()
        # skip the header in the first row
        if count == 1:
            print(row)
        else:
            service = Service()
            service.name = row[0]
            if row[1] == 'active':
                service.active = True
            else:
                service.active = False
            service.deployment = row[2]
            if row[3] == 'external':
                service.internal = False
            else:
                service.internal = True

            service.version = row[4]
            service.deployed = row[5]
            if row[6] == 'y':
                service.standard_build = True
            else:
                service.standard_build = False

            if row[8] == 'y':
                service.public = True
            else:
                service.public = False

            service.primary_poc = row[9]
            service.secondary_poc = row[10]
            service.description = row[11]
            service.url = row[12]

            existing = Service.objects.filter(name=row[0])
            if not existing.count():
                print("creating new service")
                service.save()
            else:
                print("matched exisitng service")
                service = existing[0]

            # this is used for creating default_profiles
            city_users = row[7]

            users = city_users.split(',')
            for u in users:
                # print(u)
                gid = None
                u = u.strip()
                match = False
                if u == 'Clerk':
                    u = 'City Clerk'
                if u == 'ESD':
                    u = 'Economic & Sustainable Development'
                if u == 'Plantran' or u == 'Planning':
                    u = 'Planning and Transportation'
                if u == 'Transit' or u == 'Transit (LEGACY)':
                    u = 'Bloomington Transit'
                if u == 'BPD Dana Cole' or u == 'BPD Brittani Evans' or u == 'BPD' or u == 'BPD Detectives NARC' or u == 'BPD Parking' or u == 'Parking':
                    u = 'Police'
                if u == 'Dispatch':
                    u = 'Police'
                    gid = 32

                if u == 'Parking Garages':
                    u = 'Public Works'
                    gid = 42
                if u == 'Street/Traffic':
                    u = 'Street and Traffic'
                if u == 'Animal Shelter':
                    u = 'Animal Care and Control'

                if u == 'GIS':
                    u = 'ITS'
                    gid = 4

                if u == 'Util Eng.':
                    u = 'Utilities'
                    gid = 82
                if u == 'T&D':
                    u = 'Utilities'
                    gid = 116
                if u == 'Facilities':
                    u = 'Public Works'
                if u == 'OOTM':
                    u = 'Office of the Mayor'
                if u == 'CFRD':
                    u = 'Community and Family Resources'



                for d in departments:
                    if d['name'] == u:
                        print(u, "matched", d)
                        match = d
                if not match:
                    print("No Match for", u)
                    # TODO:
                    # maybe it's a group?
                    # maybe it's a typo?
                else:
                    # see if there is an existing default_profile
                    defaults = DefaultProfile.objects.filter(department_id=match['id'], group_id=gid)
                    if defaults.exists():
                        print("Found: ", defaults.count(), "matching profiles")
                        # add the service to the matching default profile
                        #print(dir(defaults[0]))
                        if not defaults[0].services.filter(id=service.id).exists():
                            defaults[0].services.add(service)
                            defaults[0].save()
                        else:
                            print("Already had service on profile")
                    else:
                        # make a new default profile
                        default_p = DefaultProfile()
                        default_p.name = match['name']
                        default_p.department_id = match['id']
                        if gid:
                            default_p.group_id = gid
                        default_p.save()
                        default_p.services.add(service)

        # for testing, just doing a few
        # if count > 2:
        #     exit()

        count += 1
