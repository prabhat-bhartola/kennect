import HttpService from "@/common/services/http.service";

class AuthService {
  public static basePath = "auth";

  public static async signup(data: any) {
    const url = `${this.basePath}`;

    const res = await HttpService.post(this.basePath, data);

    return res.data;
  }
}

export default AuthService;
