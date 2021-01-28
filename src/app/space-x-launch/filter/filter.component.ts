import { Component, OnInit } from '@angular/core';
import { SelectedFilters } from 'src/app/common/models/dataObject.model';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  launchYear: number[] = [];
  selectedFilters: SelectedFilters = {
    launchYear: null,
    launchSuccess: null,
    landingSuccess: null
  };

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.setLaunchYear();
  }

  setLaunchYear = () => {
    for (let i = 2006; i <= 2020; i++) {
      this.launchYear.push(i);
    }
  }

  selectYear = (year: number | null) => {
    if (this.selectedFilters?.launchYear === year) {
      year = null;
    }
    this.setSelectedFilters(year, this.selectedFilters?.launchSuccess, this.selectedFilters?.landingSuccess);
  }

  launchSuccessful = (status: boolean | null) => {
    if (this.selectedFilters.launchSuccess === status) {
      status = null;
    }
    this.setSelectedFilters(this.selectedFilters?.launchYear, status, this.selectedFilters?.landingSuccess);
  }

  landingSuccessful = (status: boolean | null) => {
    if (this.selectedFilters.landingSuccess === status) {
      status = null;
    }
    this.setSelectedFilters(this.selectedFilters?.launchYear, this.selectedFilters?.launchSuccess, status);
  }

  setSelectedFilters = (year: number | null, launch: boolean | null, landing: boolean | null) => {
    this.selectedFilters = {
      launchYear: year,
      launchSuccess: launch,
      landingSuccess: landing
    };
    this.commonService.applySelectedFilters(this.selectedFilters);
  }

}
