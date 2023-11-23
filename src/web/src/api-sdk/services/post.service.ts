import HttpService from "@/common/services/http.service";

class PostService {
  public static basePath = "posts";

  public static async post(data: any) {
    const res = await HttpService.post(this.basePath, data);

    return res.data;
  }
}

export default PostService;
