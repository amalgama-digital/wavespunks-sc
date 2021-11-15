import axios from 'axios';
import { API_BASE, ADDRESS } from './config';

axios.get(API_BASE + "/addresses/data/" + ADDRESS + "?key=available_punks")
    .then(res => {
        let value = res.data[0].value;
        let arr = value.split(",");
        for (let i = 0; i <= 999; i ++) {
            if (arr[i] != i) {
                console.log("Check failed!");
                console.log(arr[i] + " != " + i);
                break;
            }
        }
    })
    .catch(e => {
        console.log(e);
    })