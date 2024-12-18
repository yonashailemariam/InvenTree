import { ModelType } from '../../enums/ModelType';
import { InvenTreeIconType } from '../../functions/icons';
import { TemplateI } from '../../tables/settings/TemplateTable';
import { TemplateEditorProps } from '../editors/TemplateEditor/TemplateEditor';
import { InvenTreeContext } from './PluginContext';
import { PluginUIFeature } from './PluginUIFeature';

// #region  Type Helpers
export type BaseUIFeature = {
  featureType: string;
  requestContext: Record<string, any>;
  responseOptions: Record<string, any>;
  featureContext: Record<string, any>;
  featureReturnType: any;
};

export type PluginUIGetFeatureType<T extends BaseUIFeature> = (params: {
  featureContext: T['featureContext'];
  inventreeContext: InvenTreeContext;
}) => T['featureReturnType'];

export type PluginUIFuncWithoutInvenTreeContextType<T extends BaseUIFeature> = (
  featureContext: T['featureContext']
) => T['featureReturnType'];

export type PluginUIFeatureAPIResponse<T extends BaseUIFeature> = {
  feature_type: T['featureType'];
  options: T['responseOptions'];
  source: string;
};

// #region Types
export type TemplateEditorUIFeature = {
  featureType: 'template_editor';
  requestContext: {
    template_type: ModelType.labeltemplate | ModelType.reporttemplate;
    template_model: ModelType;
  };
  responseOptions: PluginUIFeature;
  featureContext: {
    ref: HTMLDivElement;
    registerHandlers: (handlers: {
      setCode: (code: string) => void;
      getCode: () => string;
    }) => void;
    template: TemplateI;
  };
  featureReturnType: void;
};

export type TemplatePreviewUIFeature = {
  featureType: 'template_preview';
  requestContext: {
    template_type: ModelType.labeltemplate | ModelType.reporttemplate;
    template_model: ModelType;
  };
  responseOptions: {
    key: string;
    title: string;
    icon: InvenTreeIconType;
  };
  featureContext: {
    ref: HTMLDivElement;
    template: TemplateI;
    registerHandlers: (handlers: {
      updatePreview: (
        code: string,
        previewItem: string,
        saveTemplate: boolean,
        templateEditorProps: TemplateEditorProps
      ) => void | Promise<void>;
    }) => void;
  };
  featureReturnType: void;
};
