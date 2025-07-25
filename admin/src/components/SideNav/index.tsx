import { SubNav } from '@strapi/strapi/admin';
import { Badge, Divider } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import { Lightning } from '@strapi/icons';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)`
  border-radius: 50%;
  padding: ${({ theme }) => theme.spaces[2]};
  height: 2rem;
`;

export const SideNav = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

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
          id: 'instance_done',
          intlLabel: {
            id: 'bpmn.components.SideNav.instance_done',
            defaultMessage: 'Running',
          },
          to: '/plugins/bpmn/instances/running?status=running',
          withBullet: false,
        },
        {
          id: 'instance_end',
          intlLabel: {
            id: 'bpmn.components.SideNav.instance_end',
            defaultMessage: 'Done',
          },
          to: '/plugins/bpmn/instances/end?status=end',
          withBullet: false,
        },      
      ]
    }
  ]
  const handleClickOnLink = (destination: string) => () => {
    navigate(`/plugins/bpmn/instance/${destination}`, { 
      replace: true, 
    });
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