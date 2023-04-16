import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  numberOfSeatsToBook: number;
  totalSeats: Array<SeatType> = [];
  availableSeatsInThatRow: Array<SeatType> = [];
  totalSeatsAvailable: number;
  showError: boolean;
  showSeatUnavailableError: boolean;

  ngOnInit(): void {
    for (let i = 1; i <= 80; i++) { this.totalSeats.push({ seatNumber: i, isSelected: false }) }
  }

  allotSeats() {
    let maxSeatsAllowedInRow = 7
    let numberOfCompleteRows = (this.totalSeats.length / maxSeatsAllowedInRow).toFixed()
    let lastRowSeatsAvailable = this.totalSeats.slice(-3).filter((i) => i.isSelected == false);
    this.totalSeatsAvailable = this.totalSeats.filter((i) => i.isSelected === false).length
    if (this.numberOfSeatsToBook > maxSeatsAllowedInRow) {
      this.showError = true;
    }

    if (this.totalSeatsAvailable < this.numberOfSeatsToBook) {
      this.showSeatUnavailableError = true;
    }

    else if (this.numberOfSeatsToBook <= maxSeatsAllowedInRow) {
      this.showError = false;
      this.showSeatUnavailableError = false;
      let rowNumber: number;
      for (let i = 1; i <= +numberOfCompleteRows; i++) {
        rowNumber = i;
        this.availableSeatsInThatRow = [];
        for (let j = ((rowNumber * maxSeatsAllowedInRow) - maxSeatsAllowedInRow); j < rowNumber * maxSeatsAllowedInRow; j++) {
          if (this.totalSeats[j].isSelected === false) { this.availableSeatsInThatRow.push(this.totalSeats[j]) }
          if (this.availableSeatsInThatRow.length == this.numberOfSeatsToBook) {
            break;
          }
        }
        if (this.availableSeatsInThatRow.length == this.numberOfSeatsToBook) {
          break;
        }
      }

      if (this.numberOfSeatsToBook <= lastRowSeatsAvailable.length) {
        this.totalSeats.forEach((i) => {
          for (let j = 0; j < this.numberOfSeatsToBook; j++) {
            if (i.seatNumber === lastRowSeatsAvailable[j].seatNumber) { i.isSelected = true }
          }
        })
      } else {
        if (this.availableSeatsInThatRow.length == this.numberOfSeatsToBook) {
          this.totalSeats.forEach((i) => {
            this.availableSeatsInThatRow.forEach(j => {
              if (j.seatNumber === i.seatNumber) {
                i.isSelected = true
              }
            })
          })
        } else {
          this.totalSeats.filter((i) => i.isSelected === false).slice(0, this.numberOfSeatsToBook).forEach((i) => i.isSelected = true)
        }
      }
    }
  }
}

interface SeatType {
  seatNumber: number;
  isSelected: boolean;
}