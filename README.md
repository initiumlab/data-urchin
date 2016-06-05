# [Data Urchin](https://github.com/initiumlab/data-urchin)

The boilerplate and utilities for Data Science in Python3.

## Features

* Python3
* Hand-picked, de facto standard Python libraries
* Use IPython Notebook
* Time-proven practices in [Initium Lab](http://initiumlab.com)
* Boilerplates, sample codes, cheat sheets, quick hacks, ...
* [TODO] Integration with production-ready Javascript libraries
* [TODO] Workflow for Continuous Deployment of mining results

## Usage

Initial setup:

* Fork and Clone this repository
* Instal Python3
* `virtualenv -p python3 venv` or `pyvenv venv`
* `source venv/bin/activate`
* `pip install -r requirements.txt`

Following usage:

* `source venv/bin/activate` (save time if you use [virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/). `.venv` is configured)
* Use `ipython notebook` to launch the environment
* Copy any interesting stuff from `boilerplates` to the root and hack away

## Sample pages

* http://project.initiumlab.com/data-urchin/Sample.html

## Docker

### Get the docker image

Choose either way:

* `docker pull hupili/urchin`
* `docker build -t hupili/urchin .`

### Run The Notebook

```
docker run -v urchin:/app -p 8888:8888 -it hupili/urchin ipython notebook --ip 0.0.0.0
```

You can find the volumen on your docker-machine in following folder:
`/var/lib/docker/volumes/urchin/_data`
