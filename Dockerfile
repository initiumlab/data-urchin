FROM python:3.5.1
ENV  PYTHONUNBUFFERED 1

RUN mkdir -p /app
WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
COPY ./sources.list /etc/apt/sources.list

COPY ./ /app/

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5 3B4FE6ACC0B21F32
RUN apt-get update -y
RUN apt-get install -y python3 python3-dev
RUN apt-get install -y python-lxml python-numpy 

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
#RUN pip3 install --install-option="--jobs=12" --no-cache-dir -r requirements.txt

EXPOSE 8888

