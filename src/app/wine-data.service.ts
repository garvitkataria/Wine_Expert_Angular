import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;

@Injectable()
export class WineDataService {
	server="http://127.0.0.1:8000/"
	constructor(public http:HttpClient) 
	{
		console.log('DataService is running ...'); 
	}
	getWinesSize()
	{
		return this.http.get(this.server+"size/");
	}
	getWines(body)
	{
		console.log(body.starting,body.ending)
		return this.http.get(this.server+"?starting="+body.starting+"&ending="+body.ending);
	}

	// Search Based On Different Countries, Provinces & Regions
	getSearchSize(body)
	{
		return this.http.get(this.server+"searchsiz/?value="+body);
	}
	// Search Based On Different Countries, Provinces & Regions
	getSearch(val,limit)
	{
		console.log(this.server+"?starting="+limit.starting+"&value="+val+"&ending="+limit.ending)
		return this.http.get(this.server+"search/?starting="+limit.starting+"&value="+val+"&ending="+limit.ending);
	}
	// Search Based On Different Type Of Grapes Used.

	getVarietySizeSearch(body)
	{
		return this.http.get(this.server+"varietysiz/?value="+body);
	}
	// Search Based On Different Type Of Grapes Used.
	getVarietySearch(val,limit)
	{
		return this.http.get(this.server+"variety/?value="+val+"&ending="+limit.ending+"&starting="+limit.starting);
	}
}
