import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'apps/senai/src/services/api.service';
import { map, switchMap } from 'rxjs';
import { randomImages } from '../../images';
import { ICourse } from 'apps/senai/src/interfaces/course.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
  providers: [MessageService]
})
export class CourseDetailsComponent {
  private apiService = inject(ApiService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  isLogged = signal(false);

  isStudent = signal(false);

  id$ = this.activatedRoute.params.pipe(map(({ id }) => Number(id)));

  course$ = this.id$.pipe(
    switchMap((id) =>
      this.apiService.courseService.find(id).pipe(
        map(({ message }) => {
            return {
              ...message,
              photo: randomImages[Math.floor(Math.random() * randomImages.length)]
            } as ICourse
        })
      )
    )
  )

  course = toSignal(this.course$);

  subscribeToCourse() {
    if (this.isLogged()) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Inscricao realizada com sucesso'
      })
      this.isStudent.set(true);
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Faça login para se inscrever no curso'
      })
    }
  }

  unSubscribeToCourse(): void {
    this.isStudent.set(false);
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Desinscricao realizada com sucesso'
    })
  }
}
