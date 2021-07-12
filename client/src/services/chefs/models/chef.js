class Chef {
    constructor(name, photo, bio, email, zoom) {
        this.name = name;
        this.photo = photo;
        this.bio = bio;
        this.email = email;
        this.zoom = zoom;
    }

    static fromJson(json) {
        return new Chef (
            json.name,
            json.photo,
            json.bio,
            json.email,
            json.zoom,
        );
    }
}

export default Chef