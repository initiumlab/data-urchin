FROM python:3.5.1
ENV  PYTHONUNBUFFERED 1

RUN mkdir -p /app
WORKDIR /app

RUN pip install --upgrade pip
COPY ./requirements.txt /app
#RUN pip install --no-cache-dir -r requirements.txt

COPY ./ /app/
#VOLUME ["/app/volume"]
EXPOSE 8888
#
#COPY ./server.py /app
#COPY ./docker/app/start.sh /app
#RUN chmod 755 /app/start.sh
#CMD ["/app/start.sh"]
