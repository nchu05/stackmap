import React, { useState, useEffect } from "react";
import { t } from "../i18n";
import { ToolItem } from "../data/ToolItem";
import "./ToolConfigSidebar.scss";

interface ToolConfigSidebarProps {
  selectedTool: ToolItem | null;
  onConfigChange: (tool: ToolItem) => void;
  onClose: () => void;
}

export const ToolConfigSidebar = ({
  selectedTool,
  onConfigChange,
  onClose,
}: ToolConfigSidebarProps) => {
  const [config, setConfig] = useState<Partial<ToolItem> | null>(null);

  useEffect(() => {
    if (selectedTool) {
      setConfig({ ...selectedTool });
    }
  }, [selectedTool]);

  if (!selectedTool || !config) {
    return null;
  }

  const handleChange = (updates: Partial<ToolItem>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange({ ...selectedTool, ...newConfig });
  };

  return (
    <div className="tool-config-sidebar">
      <div className="tool-config-content">
        <div className="tool-logo">
          <img 
            src={selectedTool.image} 
            alt={selectedTool.name} 
            className="tool-logo-image"
          />
          <h4>{selectedTool.name}</h4>
        </div>
        
        <div className="form-group">
          <label>Link:</label>
          <input
            type="text"
            value={config.apiInfo?.link || ""}
            onChange={(e) => 
              handleChange({ 
                apiInfo: { 
                  ...config.apiInfo, 
                  link: e.target.value 
                } 
              })
            }
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label>API Key:</label>
          <input
            type="password"
            value={config.apiInfo?.apiKey || ""}
            onChange={(e) => 
              handleChange({ 
                apiInfo: { 
                  ...config.apiInfo, 
                  apiKey: e.target.value 
                } 
              })
            }
            placeholder="Enter API key"
          />
        </div>
      </div>
    </div>
  );
};