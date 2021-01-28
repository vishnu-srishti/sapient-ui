import { Component, OnInit } from '@angular/core';
import { SelectedFilters } from 'src/app/common/models/dataObject.model';
import { CommonService } from 'src/app/common/services/common.service';
import { Utility } from 'src/app/common/Utility/Utility';

@Component({
  selector: 'app-space-x-launch',
  templateUrl: './space-x-launch.component.html',
  styleUrls: ['./space-x-launch.component.scss']
})
export class SpaceXLaunchComponent implements OnInit {

  resultData: any;

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getSpaceData(`?limit=100`);
    this.applySelectedFilters();
  }

  getSpaceData = (filterCriteria: string) => {
    this.commonService.getApiResponse(Utility.apiUrls.launches.url + filterCriteria, Utility.apiUrls.launches.type)
      .subscribe((response: any) => {
        if (response) {
          this.resultData = response;
        }
      });
  }

  applySelectedFilters = () => {
    this.commonService.filterObjectObservable$.subscribe((selectedFilters: SelectedFilters) => {
      let filterCriteria = `?limit=100`;
      if (selectedFilters?.launchYear !== null) {
        filterCriteria += `&launch_year=${selectedFilters?.launchYear}`;
      }

      if (selectedFilters?.launchSuccess !== null) {
        filterCriteria += `&launch_success=${selectedFilters?.launchSuccess}`;
      }

      if (selectedFilters?.landingSuccess !== null) {
        filterCriteria += `&land_success=${selectedFilters?.landingSuccess}`;
      }
      this.getSpaceData(filterCriteria);
    });
  }

}
