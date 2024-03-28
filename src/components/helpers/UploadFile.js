import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export const UPLOAD_PROFILE_PIC = gql`
mutation UploadProfilePic($file: Upload!, $userId: ID!) {
  uploadProfilePic(file: $file, userId: $userId) {
    success
    url
  }
}
`;