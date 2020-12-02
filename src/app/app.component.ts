import { Component, OnInit } from '@angular/core';
import { Medicine } from './_models/medicine';
import { PaginatedResult, Pagination } from './_models/pagination';
import { MessageService } from './_services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  medicines: Medicine[];
  pagination: Pagination;
  likesParam: string;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  constructor(private messageService: MessageService)
  {  }
  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.messageService.getMedicines(1, 10,
      null).subscribe((res: PaginatedResult<Medicine[]>) => {
        this.medicines = res.result;
        this.pagination = res.pagination;
      }, error => console.log(error));
  }
  title = 'pharma-frontend';
}
