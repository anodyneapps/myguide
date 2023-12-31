export interface User {
    _id?: string;
    user_name: string;
    display_name?: string;
    oauth_id: string;
    email_address: string;
    user_preference: {
        follow_music_events: boolean;
        follow_meetup_events: boolean;
        follow_food_events : boolean;
        location: string;
    };
}
