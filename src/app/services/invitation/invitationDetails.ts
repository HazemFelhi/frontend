export interface invitationDetails {
//de invitation
    id_invitation: number;
    email: string;
    entrepriseId: number;
//de keycloak
    user_id: string;
    username: string;
    firstName: string;
    lastName: string;
    mobile :string;
    isShown:boolean;
}