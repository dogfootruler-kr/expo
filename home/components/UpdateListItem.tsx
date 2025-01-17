import { UpdateIcon, iconSize, ChevronDownIcon } from '@expo/styleguide-native';
import format from 'date-fns/format';
import { Row, Spacer, Text, useExpoTheme, View } from 'expo-dev-client-components';
import React from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { DateFormats } from '../constants/DateFormats';
import * as UrlUtils from '../utils/UrlUtils';

type Props = {
  id: string;
  message?: string;
  createdAt: string;
  manifestPermalink: string;
};

export function UpdateListItem({ id, message, createdAt, manifestPermalink }: Props) {
  const theme = useExpoTheme();

  const handlePress = () => {
    Linking.openURL(UrlUtils.toExp(UrlUtils.normalizeUrl(manifestPermalink)));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View padding="medium" bg="default" border="hairline" rounded="large">
        <Row align="center" justify="between">
          <View align="start" flex="1">
            <Row flex="1">
              <UpdateIcon color={theme.icon.default} size={iconSize.small} />
              <Spacer.Horizontal size="tiny" />
              <View flex="1">
                <Text type="InterSemiBold" size="small" ellipsizeMode="middle" numberOfLines={1}>
                  {message ? `"${message}"` : id}
                </Text>
                <Spacer.Vertical size="tiny" />
                <Text
                  type="InterRegular"
                  color="secondary"
                  size="small"
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  Published {format(new Date(createdAt), DateFormats.timestamp)}
                </Text>
              </View>
            </Row>
          </View>
          <Spacer.Horizontal size="tiny" />
          <ChevronDownIcon
            style={{ transform: [{ rotate: '-90deg' }] }}
            color={theme.icon.secondary}
          />
        </Row>
      </View>
    </TouchableOpacity>
  );
}
