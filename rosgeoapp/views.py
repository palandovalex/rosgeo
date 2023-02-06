from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rosreestr2coord import Area
import json

def index(request):
    return render(request, 'rosgeoapp/index.html', {})

def getgeo(request):
    cadastrCode = request.POST.get('cadastrCode')
    area = Area(cadastrCode)
    result = area.to_geojson_poly()
    #return json.load(open(os.path.join(STATIC_DIR, u"catalog.json")))
    return HttpResponse(result, content_type="application/json")
