FROM python:3

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# create root directory for our project in the container
RUN mkdir /srv/account_tracker

ADD requirements.txt /srv/account_tracker

# Set the working directory 
WORKDIR /srv/account_tracker

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt