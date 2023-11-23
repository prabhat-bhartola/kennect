import HttpService from "@/common/services/http.service";

class UserService {
  public static basePath = "users";

  public static async get() {
    const url = `${this.basePath}/me`;

    const res = await HttpService.get(url);

    return res.data;
  }

  public static async post(data: any) {
    const res = await HttpService.post(this.basePath, data);

    return res.data;
  }
}

export default UserService;
