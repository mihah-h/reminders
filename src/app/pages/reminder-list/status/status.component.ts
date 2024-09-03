import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { STATUS_NAME } from '../../../core/models/status-name.enum';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
  @HostBinding('class')
  @Input() statusName = STATUS_NAME.NEW;
}
