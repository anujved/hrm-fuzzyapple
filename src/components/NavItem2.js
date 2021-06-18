import React from "react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import { Button, ListItem, Collapse, List, Box } from "@material-ui/core";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";

const NavItem2 = ({ href, icon: Icon, title, items = [], ...rest }) => {
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  const location = useLocation();

  const active = href
    ? !!matchPath({ path: href, end: false }, location.pathname)
    : false;

  let endIcon = null;
  if (isExpandable && !open) {
    endIcon = <IconExpandMore />;
  } else if (isExpandable && open) {
    endIcon = <IconExpandLess />;
  }

  const toggleOpen = () => {
    setOpen(!open);
  };

  const _renderNonLinkButton = () => {
    return (
      <Button
        onClick={toggleOpen}
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          width: "100%",
          ...(active && {
            color: "primary.main",
          }),
          "& svg": {
            mr: 1,
          },
        }}
        endIcon={endIcon}
      >
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Button>
    );
  };

  const _renderLinkButton = () => {
    return (
      <Button
        component={RouterLink}
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          width: "100%",
          ...(active && {
            color: "primary.main",
            backgroundColor: '#C7FBCD'
          }),
          "& svg": {
            mr: 1,
          },
        }}
        to={href}
      >
        {Icon && <Icon size="20"/>}
        <span>{title}</span>
      </Button>
    );
  };

  const MenuItemRoot = () => {
    return (
      <ListItem disableGutters sx={{ display: "flex", py: 0 }} {...rest}>
        {isExpandable ? _renderNonLinkButton() : _renderLinkButton()}
      </ListItem>
    );
  };

  const MenuItemChildren = () => {
    if (isExpandable) {
      return (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {items.map((item, index) => {
              const { href, icon, title, ...rest } = item;
              return (
                <Box marginLeft={3}>
                  <NavItem2
                    href={href}
                    icon={icon}
                    title={title}
                    key={index}
                    {...rest}
                  />
                </Box>
              );
            })}
          </List>
        </Collapse>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      {MenuItemRoot()}
      {MenuItemChildren()}
    </React.Fragment>
  );
};

NavItem2.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  items: PropTypes.array,
};

export default NavItem2;
