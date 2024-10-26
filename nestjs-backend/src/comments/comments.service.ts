import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = this.commentModel.create({
      content: createCommentDto.content,
      parent: createCommentDto.parentId || null,
      user: createCommentDto.userId,
    });
    const doc = await newComment;
    return await doc.populate(['user', 'parent']);
  }

  findAll() {
    return this.commentModel.find().populate(['user', 'parent']).exec();
  }

  getTopLevelComments() {
    return this.commentModel
      .find({ parent: null })
      .populate(['user'])
      .sort({ createdAt: -1 })
      .exec();
  }

  getCommentByParentId(parentId: string) {
    return this.commentModel.find({ parent: parentId }).populate(['user']).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
