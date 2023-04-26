import http from "@/http-common";

/* eslint-disable */
class BlurringRunService {
  get_run(run_id: any): Promise<any> {
    return http.get(`/run/${run_id}`);
  }

  start_process(data: any): Promise<any> {
    return http.post("/run/burring_process", data);
  }

}

export default new BlurringRunService();
