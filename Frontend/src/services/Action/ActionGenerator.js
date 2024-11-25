
export class Action {
    stagedAction;
    constructor() {
    }
    follow(userId) {
        return this.stagedAction = JSON.stringify({
            type: "follow",
            value: userId
        });
    }
    unfollow(userId) {
        return this.stagedAction = JSON.stringify({
            type: "unfollow",
            value: userId
        });
    }
    like(blogId){
       return this.stagedAction = JSON.stringify({
              type:"like",
              value:blogId
       })
    }
    unlike(blogId){
        return this.stagedAction = JSON.stringify({
            type:"unlike",
            value:blogId
        })
    }
    addComment(blogId){
        return this.stagedAction = JSON.stringify({
            type:"addComment",
            value:blogId
        })
    }
    deleteComment(blogId){
        return this.stagedAction = JSON.stringify({
            type:"deleteComment",
            value:blogId
        })
    }
    bucketCleanup(currentAvatarId){
        return this.stagedAction = JSON.stringify({
            type:"bucketCleanup",
            value:currentAvatarId
        })
    }
    verifyEmail(userId,secret){
        return this.stagedAction = JSON.stringify({
            userId:userId,
            token:secret,
            action:"VERIFY_VERIFICATION_EMAIL"
        })
    }
    generateEmailVerification(userId,email){
        return this.stagedAction = JSON.stringify({
            userId:userId,
            email:email,
            action:"GENERATE_VERIFICATION_EMAIL"
        })
    }
    generateMagicUrl(email){
        return this.stagedAction = JSON.stringify({
            email:email,
            action:"GENERATE_MAGIC_URL"
        })
    }
    verifyMagicUrl(userId,secret){
        return this.stagedAction = JSON.stringify({
            userId:userId,
            token:secret,
            action:"VERIFY_MAGIC_URL"
        })
    }

    resetPassword(userId, password){
        return this.stagedAction = JSON.stringify({
            userId:userId,
            password:password,
            action:"RESET_PASSWORD"
        })
    }

    readGenNotification(notificationId){
        return this.stagedAction = JSON.stringify({
            type:"readGenNotification",
            value:notificationId
        })
    }
    removeGenNotification(notificationId){
        return this.stagedAction = JSON.stringify({
            type:"removeGenNotification",
            value:notificationId
        })
    }

}

 const action = new Action();
 export default action;