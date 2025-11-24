import { render, screen } from '@testing-library/react';
import { ProfileImage } from '../profile-image';

describe('ProfileImage', () => {
  it('should render the profile image', () => {
    render(<ProfileImage />);
    const profileImage = screen.getByTestId('profile-image');
    expect(profileImage).toBeInTheDocument();
  });
});
