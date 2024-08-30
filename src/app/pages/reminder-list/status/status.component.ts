import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { STATUS_NAME } from '../../../core/models/status-name';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
  @Input() statusName = STATUS_NAME.NEW;

  @HostBinding('class') get statusClass() {
    switch (this.statusName) {
      case STATUS_NAME.NEW:
        return 'new';
      case STATUS_NAME.COMPLETED:
        return 'completed';
      case STATUS_NAME.PLANNED:
        return 'planned';
      case STATUS_NAME.EXPIRED:
        return 'expired';
    }
  }
}
