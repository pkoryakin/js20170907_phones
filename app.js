"use strict"

class Calendar {
    constructor(options) {
        this.year = options.year
        this.month = options.month - 1
    }

    render(rootDiv) {
        let table = this._createTable()
        console.log(table)
        rootDiv.appendChild(table)
    }

    _createTable() {
        let table = document.createElement("table")

        let thead = document.createElement("thead")
        let headRow = document.createElement("tr")
        thead.appendChild(headRow)
        this._appendTh(headRow, ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'])

        let tbody = document.createElement("tbody")

        let firstDayOfMonth = new Date(this.year, this.month)
        let lastDayOfMonth = new Date(this.year, this.month + 1, 0)
        let numberOfDays = lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1
        let numberOfWeeks = this._getNumberOfWeeks(firstDayOfMonth)

        console.log("Количество дней: " + numberOfDays)
        console.log("Количество недель: " + numberOfWeeks)

        let date = firstDayOfMonth;
        while (this._addWeekRow(tbody, date)) {
            let dayOfWeek = date.getDay()
            let dayOfMonth = date.getDate()
            dayOfMonth += 8 - dayOfWeek
            date.setDate(dayOfMonth)
        }

        table.appendChild(thead)
        table.appendChild(tbody)
        return table
    }

    /*
     * Добавление строки для недели
     */
    _addWeekRow(tbody, firstDate) {
        if (firstDate.getMonth() != this.month) {
            console.log("Эта дата уже в следующем месяце, не добавляем строку для недели: " + firstDate)
            return false
        }
        let tr = document.createElement("tr")
        let date = new Date(firstDate)
        let firstDayOfWeek = date.getDay()
        for (let d = 0; d < 7; d++) {
            let td = document.createElement("td")            
            if(d+1 >= firstDayOfWeek){
                td.innerHTML = date.getDate()
                date.setDate(date.getDate()+1)
            }
            td.onmouseenter = this._handleMouseEntersCell
            td.onmouseleave = this._handleMouseLeavesCell
            tr.appendChild(td)            
        }
        tbody.appendChild(tr)
        return true
    }

    _handleMouseLeavesCell(event){
        event.target.classList.add("transition");
        event.target.classList.remove("highlight");
        setTimeout(()=>{event.target.classList.remove("transition");},1000)
    }

    _handleMouseEntersCell(event){
        event.target.classList.add("highlight");
    }

    _getNumberOfWeeks(firstDayOfMonth) {
        let numberOfWeeks = 1;
        let date = new Date(firstDayOfMonth);
        while (true) {
            date.setDate(date.getDate() + 7)
            if (date.getMonth() != this.month) {
                break;
            }
            numberOfWeeks++
        }

        return numberOfWeeks
    }

    _appendTh(tr, days) {
        for (let day in days) {
            let th = document.createElement("th")
            th.innerText = days[day]
            tr.appendChild(th)
        }
    }
}

let calendar = new Calendar({ year: 2017, month: 8 })
calendar.render(document.querySelector("#output"))