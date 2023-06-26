import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css'],
})
export class ShowInspectionComponent implements OnInit {
  inspectionList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;
  inspectionTypesList: any = [];

  statusesList$!: Observable<any[]>;

  inspectionTypesMap: Map<string, string> = new Map();
  constructor(private service: InspectionApiService) {}

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }

  modalTitle: string = '';
  activateAddEditInspectionComponent: boolean = false;
  inspection: any;

  modalAdd() {
    this.inspection = {
      id: 0,
      status: null,
      comments: null,
      inspectionTypeId: null,
    };
    this.modalTitle = 'Add Inspection';
    this.activateAddEditInspectionComponent = true;
  }
  refreshInspectionTypesMap(): void {
    this.service.getInspectionTypesList().subscribe((data) => {
      this.inspectionTypesList = data;
      for (let i = 0; i < data.length; i++) {
        this.inspectionTypesMap.set(
          this.inspectionTypesList[i].id,
          this.inspectionTypesList[i].inspectionName
        );
      }
    });
  }

  modalEdit(item: any) {
    this.inspection = item;
    this.modalTitle = 'Edit inspection';
    this.activateAddEditInspectionComponent = true;
  }

  modalClose() {
    this.activateAddEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionList();
  }

  delete(item: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteInspection(item.id).subscribe((res) => {
        var closeAddBtn = document.getElementById('add-edit-modal-close');
        if (closeAddBtn) {
          closeAddBtn.click();
        }
        var showDeleteSucess = document.getElementById('delete-success-alert');
        if (showDeleteSucess) {
          showDeleteSucess.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSucess) {
            showDeleteSucess.style.display = 'block';
          }
        }, 4000);
        this.inspectionList$ = this.service.getInspectionList();
      });
    }
  }
}
