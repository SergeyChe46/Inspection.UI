import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css'],
})
export class AddEditInspectionComponent implements OnInit {
  inspectionList$!: Observable<any[]>;
  statusList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;

  @Input() inspection: any;
  id: number = 0;
  status: string = '';
  comments: string = '';
  inspectionTypeId!: number;

  constructor(private service: InspectionApiService) {}
  ngOnInit(): void {
    this.id = this.inspection.id;
    this.status = this.inspection.status;
    this.comments = this.inspection.comments;
    this.inspectionTypeId = this.inspection.inspectionTypeId;
    this.statusList$ = this.service.getStatusesList();
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
  }

  addInspection() {
    var inspection = {
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId,
    };
    this.service.addInspection(inspection).subscribe((res) => {
      var closeAddBtn = document.getElementById('add-edit-modal-close');
      if (closeAddBtn) {
        closeAddBtn.click();
      }
      var showAddSucess = document.getElementById('show-success-alert');
      if (showAddSucess) {
        showAddSucess.style.display = 'block';
      }
      setTimeout(function () {
        if (showAddSucess) {
          showAddSucess.style.display = 'block';
        }
      }, 4000);
    });
  }
  updateInspection() {
    var inspection = {
      id: this.id,
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId,
    };
    var id: number = this.id;
    this.service.updateInspection(id, inspection).subscribe((res) => {
      var closeAddBtn = document.getElementById('add-edit-modal-close');
      if (closeAddBtn) {
        closeAddBtn.click();
      }
      var showUpdateSucess = document.getElementById('update-success-alert');
      if (showUpdateSucess) {
        showUpdateSucess.style.display = 'block';
      }
      setTimeout(function () {
        if (showUpdateSucess) {
          showUpdateSucess.style.display = 'block';
        }
      }, 4000);
    });
  }
}
