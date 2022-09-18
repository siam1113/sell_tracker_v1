            let choices = [];
            let CusName = document.getElementById('c_name');// If i write value there returns a empty string , WHY ???
            let th = document.getElementById('cusName');
            let setDate = document.getElementById('date');
            let time = document.getElementById('time');
            let date = new Date();
            let sells = [];
            let totalCus = 0;
let sellCount = [0];
let countTotal = [0];
            let scParse = JSON.parse(localStorage.getItem('sellCount'));
            let ctParse = JSON.parse(localStorage.getItem('countTotal'));
            let nowTime = `${date.getDate()} / ${date.getUTCMonth()} / ${date.getFullYear()}`;
            let nowDate = `${date.getHours()}h : ${date.getMinutes()}m : ${date.getSeconds()}s`;
            let showAll = document.getElementById('showAll');
            let totalSell = document.getElementById('totalSell');
            //localStorage.removeItem('sellCount');
            if (scParse) {
                totalCus = scParse[0];
            }
            if (ctParse) {
                totalSell.innerHTML = Number(ctParse[0]);
            }
        function sub() {
                    
            //Setting Date
            setDate.innerHTML = `Date - ${nowTime}` ;
            //Setting Time        
            time.innerHTML = `Time - ${nowDate}`;
            // Assigning the value of th      
            th.innerHTML = `C. Name : ${CusName.value}`;
            var choice = document.getElementById('items');
            var list = document.getElementById('items_chosen');
            var n_choice = document.getElementById('n_choice');
            // Checking if the item and amount are chosen or not and returning a message according to the Error
            if ((choice.value == 'Choose Item') || (n_choice.value == 'Choose Quantity')) {

                if (choice.value == 'Choose Item') {
                    prompt('Choose An Item');
                }
                else if (n_choice.value == 'Choose Quantity') {
                    prompt('Choose Quantity of Item');
                }
            // Returning this if there is no error and all the field filled properly (From line : 34-56)
            } else {
                 // Total Cost Counting
            choices.push(Number(choice.value) * Number(n_choice.value));
            console.log(choices);
                var sum = 0;
                
            for (let i of choices) {
                sum += Number(i);
                };
                
                document.getElementById('total_value').innerHTML = sum;
                

            // Selected item Listing

            var index = choice.selectedIndex;
            var name = choice.options[index].innerHTML;
            list.innerHTML += `<td>${name}</td> <td> = ${n_choice.value} Piece</td> <td> =>  ${choice.value * n_choice.value}</td>`;
            }
            sells.push(`${name} = ${n_choice.value} => ${choice.value}`);// Array
            //sells.push({ PName: `${name}`, Quantity : `${n_choice.value}`, Price: `${choice.value}` });// Object
            console.log(sells);
            choice.value = 'Choose Item';
            n_choice.value = 'Choose Quantity';
        };

        // Adding data to local-storage
        function add() {
            // Using the below function to store data local storage with unique name
            function addTotalCus() {
                totalCus += 1;
                sellCount.push(totalCus);
                sellCount.shift();
                console.log(sellCount);

                totalSell.innerHTML = Number(totalSell.innerHTML) +  Number(document.getElementById('total_value').innerHTML);
                countTotal.push(totalSell.innerHTML);
                countTotal.shift();
            }
            addTotalCus();
            // To insert buyer name first in the array
            sells.unshift(`Cus_Name => ${CusName.value}`, `Date => ${nowDate}`, `Time => ${nowTime}`);// Array
            //sells.unshift({ CName:`${CusName.value}`, Date : `${setDate.innerHTML}`, Time: `${time.innerHTML}`});//Object
            sells.push(`Total Amount =>${document.getElementById('total_value').innerHTML}`)//Array
            //sells.push({ Total_Price: `${document.getElementById('total_value').innerHTML}` });//Object
            localStorage.setItem(`sell${totalCus}`, JSON.stringify(sells));
            localStorage.setItem(`sellCount`, JSON.stringify(sellCount));
            localStorage.setItem('countTotal', JSON.stringify(countTotal));
            document.getElementById('items_chosen').innerHTML = '';
            document.getElementById('c_name').value = '';
            document.getElementById('total_value').innerHTML = 0;
            sells = [];
            choices = [];
        }
                

        function showAllSell() {
            for (var i = 1; i <= scParse[0]; i++){
                var result = JSON.parse(localStorage.getItem(`sell${i}`));
                for (var k = 0; k < result.length; k++){
                    /*if (k == 0) {
                        console.log(`
                        Customer Name : ${result[k].CName}
                        Date : ${result[k].Date}
                        Time : ${result[k].Time}
                        `)
                    }
                    if (k > 0 && k < (result.length - 1)) {
                        console.log(`
                        Product Name : ${result[k].PName}
                        Quantity : ${result[k].Quantity}
                        Price : ${result[k].Price}
                        `)
                    }*/
                    //console.log(`${result[k]} `);
                    showAll.innerHTML += `${result[k]} <br> `;// !!!!!! Understand this line properly and precisely
                    if (k == (result.length - 1)) {
                        //console.log(`Total_Price : ${result[k].Total_Price}`)
                        //console.log('..................');
                        showAll.innerHTML += '...................................<br>';
                    }
                }
                
                //console.log(JSON.parse(localStorage.getItem(`sell${i}`)));
            }
        };
        
