import { SubNav, useTracking } from '@strapi/strapi/admin';
import { Badge, Divider } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import { Lightning } from '@strapi/icons';
import { useLocation } from 'react-router-dom';

const StyledBadge = styled(Badge)`
  border-radius: 50%;
  padding: ${({ theme }) => theme.spaces[2]};
  height: 2rem;
`;

export const SideNav = () => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { pathname } = useLocation();

  let label = "BPMN2.0"
  let sections = [
    {
      id: 'moderation',
      intlLabel: {
        id: 'bpmn.components.SideNav.moderation',
        defaultMessage: 'Moderation',
      },
      links: [
        {
          id: 'process',
          intlLabel: {
            id: 'bpmn.components.SideNav.process',
            defaultMessage: 'Process',
          },
          to: '/plugins/bpmn/processes',
        },
        {
          id: 'instance',
          intlLabel: {
            id: 'bpmn.components.SideNav.instance',
            defaultMessage: 'Instance',
          },
          to: '/plugins/bpmn/instances',
          withBullet: false,
        },]
    }
  ]
  const handleClickOnLink = (destination: string) => () => {
    trackUsage('willNavigate', { from: pathname, to: destination });
  };

  return (
    <SubNav.Main aria-label={label}>
      <SubNav.Header label={label} />
      <Divider background="neutral150" marginBottom={5} />
      <SubNav.Sections>
        {sections.map((section) => (
          <SubNav.Section key={section.id} label={formatMessage(section.intlLabel)}>
            {section.links.map((link) => {
              return (
                <SubNav.Link
                  to={link.to}
                  onClick={handleClickOnLink(link.to)}
                  key={link.id}
                  label={formatMessage(link.intlLabel)}
                  endAction={
                    <>
                      {link?.licenseOnly && (
                        <Lightning fill="primary600" width="1.5rem" height="1.5rem" />
                      )}
                      {link?.hasNotification && (
                        <StyledBadge
                          aria-label="Notification"
                          backgroundColor="primary600"
                          textColor="neutral0"
                        >
                          1
                        </StyledBadge>
                      )}
                    </>
                  }
                />
              );
            })}
          </SubNav.Section>
        ))}
      </SubNav.Sections>
    </SubNav.Main>
  );
};