import { Component, OnInit } from '@angular/core';
import {WineDataService} from '../wine-data.service';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit {
	size=0.0
  	one_Page = 1000
  	total_pages = 0
  	in_last_page = 0

  	current_page = 1

  	loading_flag = 0

  	dataSearched="Normal"
  	search_value=""

  	index={
  		"starting" : 0,
  		"ending" : 0
  	}
  	

  	search_flag = 0;
  	search_txt = "";
  	variety_search_flag = 0;
  	variety_search_txt = "";

  	search_error=""
  	variety_search_error=""
  	wines:Wine[];

  	constructor(private dataService:WineDataService) { }
	ngOnInit() 
	{
		console.log("Size of Data");
		this.dataService.getWinesSize().subscribe((res:any)=>{
			this.size=res
			console.log(this.size);
			// this.size=17
			this.total_pages = Math.floor(this.size/this.one_Page)
			this.in_last_page = this.size%this.one_Page
			if(this.in_last_page==0)
			{
				this.total_pages=this.total_pages-1
			}
			console.log(this.total_pages);
			console.log(this.in_last_page);

			this.index.starting = (this.current_page-1) * this.one_Page;
			this.index.ending = this.current_page * this.one_Page;
			if(this.total_pages == 0)
			{
				this.index.ending = this.index.ending + this.in_last_page - this.one_Page
			}
			this.dataService.getWines(this.index).subscribe((wines:Wine [])=>{
			this.wines=wines;
			console.log(this.wines[0]);
			});
		});
	}
	NextPage()
	{
		this.loading_flag = 1
		console.log("Next Page");
		this.current_page = 1 + this.current_page;

		this.index.starting = (this.current_page-1) * this.one_Page;
		this.index.ending = this.current_page * this.one_Page;

		if(this.current_page == this. total_pages+1 && this.in_last_page!=0) 
		{
			this.index.ending = this.index.ending + this.in_last_page - this.one_Page;
		}
		if(this.dataSearched=="Normal")
		{
			this.dataService.getWines(this.index).subscribe((wines:Wine [])=>{
			this.wines=wines;
			console.log(this.wines[0]);
			this.loading_flag = 0;
			});
		}
		else if(this.dataSearched=="Search")
		{
			this.dataService.getSearch(this.search_value,this.index).subscribe((wines:Wine [])=>{
			this.wines=wines;
			console.log(this.wines[0]);
			this.loading_flag = 0;
			});
		}
		else if(this.dataSearched=="Variety")
		{
			this.dataService.getVarietySearch(this.search_value,this.index).subscribe((wines:Wine [])=>{
			this.wines=wines;
			console.log(this.wines[0]);
			this.loading_flag = 0;
			});
		}
	}
	PreviousPage()
	{
		console.log("Previous Page");
		this.current_page = this.current_page - 1;

		this.index.starting = (this.current_page-1) * this.one_Page;
		this.index.ending = this.current_page * this.one_Page;
		
		if(this.dataSearched=="Normal")
		{
			this.dataService.getWines(this.index).subscribe((wines:Wine [])=>{
			this.wines=wines;
			console.log(this.wines[0]);
			this.loading_flag = 0;
			});
		}
		else if(this.dataSearched=="Search")
		{
			this.dataService.getSearch(this.search_value,this.index).subscribe((wines:Wine [])=>{
			this.wines=wines;
			console.log(this.wines[0]);
			this.loading_flag = 0;
			});
		}
		else if(this.dataSearched=="Variety")
		{
			this.dataService.getVarietySearch(this.search_value,this.index).subscribe((wines:Wine [])=>{
			this.wines=wines;
			console.log(this.wines[0]);
			this.loading_flag = 0;
			});
		}
	}

	PriceHighToLow()
	{
		console.log("Price High To Low")
		this.wines=this.wines.sort((a,b) => (b.price)-(a.price));
	}
	PriceLowToHigh()
	{
		console.log("Price Low To High")
		this.wines=this.wines.sort((a,b) => (a.price)-(b.price));
	}
	// Search Based On Different Countries, Provinces & Regions
	Search(value)
	{
		this.search_error=""
		this.current_page = 1
		this.dataSearched = "Search"
		this.search_value = value

		console.log("Search Based On Different Countries, Provinces & Regions =>",value )
		this.search_flag=0;
		this.search_txt = "Enter a vailed entry for search.";
		if(value!="")
		{	
			this.search_txt = "Loading...";
			this.dataService.getSearchSize(value).subscribe((size : any)=>{
				this.size=size;
				console.log(this.size);
				// this.size=17
				this.total_pages = Math.floor(this.size/this.one_Page)
				this.in_last_page = this.size%this.one_Page
				if(this.in_last_page==0)
				{
					this.total_pages=this.total_pages-1
				}
				console.log(this.total_pages);
				console.log(this.in_last_page);

				this.index.starting = (this.current_page-1) * this.one_Page;
				this.index.ending = this.current_page * this.one_Page;
				if(this.total_pages == 0)
				{
					this.index.ending = this.index.ending + this.in_last_page - this.one_Page
				}

				this.dataService.getSearch(value,this.index).subscribe((wines:Wine [])=>{
				this.wines=wines;
				this.search_flag=1;
				this.search_txt = "Result Retrieved Successfully";
				});
			}
			, error => {
     			 console.log(error.message);
     			 this.search_txt = "";
     			 this.search_error=error.message;
		    });	
		}
	}
	VarietySearch(value)
	{
		this.variety_search_error=""
		this.current_page = 1
		this.dataSearched = "Variety"
		this.search_value = value

		console.log("Search Based On Different Type Of Grapes Used. =>",value )
		this.variety_search_flag=0;
		this.variety_search_txt = "Enter a vailed entry for search.";
		if(value!="")
		{	
			this.variety_search_txt = "Loading...";
			this.dataService.getVarietySizeSearch(value).subscribe((size : any)=>{
				this.size=size;
				console.log(this.size);
				// this.size=17
				this.total_pages = Math.floor(this.size/this.one_Page)
				this.in_last_page = this.size%this.one_Page
				if(this.in_last_page==0)
				{
					this.total_pages=this.total_pages-1
				}
				console.log(this.total_pages);
				console.log(this.in_last_page);

				this.index.starting = (this.current_page-1) * this.one_Page;
				this.index.ending = this.current_page * this.one_Page;
				if(this.total_pages == 0)
				{
					this.index.ending = this.index.ending + this.in_last_page - this.one_Page
				}

				this.dataService.getVarietySearch(value,this.index).subscribe((wines:Wine [])=>{
				this.wines=wines;
				this.variety_search_flag=1;
				this.variety_search_txt = "Result Retrieved Successfully";
				});
			}
			, error => {
     			 console.log(error.message);
     			 this.variety_search_txt = "";
     			 this.variety_search_error=error.message;
		    });	

			
		}
	}
	alertFunction(des)
	{
		console.log("Alert",des)
		alert("Description: "+des);
	}
}
interface Wine
{
	country: ""
	created_at: ""
	description: ""
	designation: ""
	id: 0
	points: 0.0
	price: 0.0
	province: ""
	region_1: ""
	region_2: ""
	variety: ""
	winery: ""
}
