import HttpService from "@/common/services/http.service";

class CommentService {
  public static basePath = "comments";

  public static async post(data: any) {
    const res = await HttpService.post(this.basePath, data);

    return res.data;
  }
}

export default CommentService;
