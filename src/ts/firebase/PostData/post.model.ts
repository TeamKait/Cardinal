export class Post {
    public id?: string
    public user: string
    public label: string
    public content: string
    public likesBy: string[]
    public dislikesBy: string[]
    public createdAt?: Date

    public constructor(
        user: string,
        label: string,
        content: string,
        id?: string,
        likesBy?: string[],
        dislikesBy?: string[],
        createdAt?: Date
    ) {
        this.user = user
        this.label = label
        this.content = content
        this.id = id
        this.likesBy = likesBy ?? []
        this.dislikesBy = dislikesBy ?? []
        this.createdAt = createdAt
    }

    get likesCount(): number {
        return this.likesBy?.length ?? 0
    }

    get dislikesCount(): number {
        return this.dislikesBy?.length ?? 0
    }
}