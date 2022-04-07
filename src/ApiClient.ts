import axios from 'axios'

class ApiClient {
  public header: any = {};
  public baseURL: any;
  public googleBaseURL: any;
  public localhostBaseURL: any;

  public constructor () {
    this.header = { 'Content-Type': 'application/json' };
    this.googleBaseURL = axios.create({ baseURL: `${import.meta.env.VITE_GOOGLE_SHEET_API_BASEURL}` });
    // 自架的app
    this.localhostBaseURL = axios.create({ baseURL: `${import.meta.env.VITE_GOOGLE_ADDSHEET_API_BASEURL}` });
  }
  /*
  * 取得工作表清單
  */
  public getSheet () {
    return this.googleBaseURL.request({
      method: 'get',
      url: `./${import.meta.env.VITE_GOOGLE_SHEET_ID}?key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
      headers: this.header
    })
  }

  /*
  * 取得工作表內容 需要參數: sheetTitle
  */
  public getSheetValue (sheetTitle: any) {
    return this.googleBaseURL.request({
      method: 'get',
      url: `./${import.meta.env.VITE_GOOGLE_SHEET_ID}/values/${sheetTitle}?key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
      headers: this.header
    })
  }

  /*
  * 新增工作表 / 合併儲存格
  */
  public doSheet (data: any) {
    return this.localhostBaseURL.request({
      method: 'post',
      url: './doSheet',
      headers: this.header,
      data: data
    })
  }
  /*
  * 寫入第一筆資料
  */
  public createSheetValue (data: any) {
    return this.localhostBaseURL.request({
      method: 'post',
      url: './initSheetValues',
      headers: this.header,
      data: data
    })
  }
  /*
  * 插入資料在最後
  */
  public appendSheetValue (data: any) {
    return this.localhostBaseURL.request({
      method: 'post',
      url: './appendValues',
      headers: this.header,
      data: data
    })
  }
}

const ApiClientInstance = new ApiClient();
export default ApiClientInstance;