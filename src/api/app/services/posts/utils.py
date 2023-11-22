from uuid import UUID

from app.common.common import uid

from .models import Post


async def get_post_by_id(post_id: UUID):
    search_criteria = {"_id": uid(post_id)}

    post = await Post.find_one(search_criteria)

    return post
