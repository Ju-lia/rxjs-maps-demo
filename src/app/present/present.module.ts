import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './main/map/map.component';
import { MergeMapComponent } from './main/merge-map/merge-map.component';
import { PresentComponent } from './present.component';
import { ConcatMapComponent } from './main/concat-map/concat-map.component';
import { SwitchMapComponent } from './main/switch-map/switch-map.component';
import { ExhaustMapComponent } from './main/exhaust-map/exhaust-map.component';

@NgModule({
  declarations: [
    PresentComponent,
    FooterComponent,
    MainComponent,
    MapComponent,
    MergeMapComponent,
    ConcatMapComponent,
    SwitchMapComponent,
    ExhaustMapComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
  ],
  exports: [PresentComponent],
})
export class PresentModule {}
