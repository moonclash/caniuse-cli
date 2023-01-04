import Table from 'cli-table';
import axios from 'axios';

export default class CanIUseFetchService {
    
    static async getData(feature, limit) {
        const response = await axios.get(`https://m5fg5afuue.execute-api.eu-west-1.amazonaws.com/latest/${feature}`);    
        const data = response.data;
        const browsersResult = Object.keys(data); 
        const browsersLimit = limit ? limit : browsersResult.length;
        const browsers = browsersResult.slice(0, browsersLimit);
        const table = new Table();
        browsers.forEach(browser => {
            const row = {};
            row[browser] = data[browser];
            table.push(row);
        })
        return table.toString();
    }
}