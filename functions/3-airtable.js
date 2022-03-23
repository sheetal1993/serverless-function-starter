const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID)
  .table(process.env.AIRTABLE_TABLE_NAME)
exports.handler = async (event,context) => {
    try {
        const {records} = airtable.list();
        const products = records.map((product) => {
            const {id} = product;
            const {name,image,price} = product.fields;
            const url = image[0].url;
            return {id,name,url,price}
        })
        return {
            statusCode: 200,
            body: JSON.stringify(products),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: 'server error',
        } 
    }
    
    
}