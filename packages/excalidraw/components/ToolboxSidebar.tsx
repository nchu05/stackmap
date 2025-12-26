import React, { useState, useMemo } from "react";
import { t } from "../i18n";
import { TOOLS } from "../data/tools";
import { AppClassProperties } from "../types";
import { ToolItem } from "../data/ToolItem";
import "./ToolboxSidebar.scss";

// Storage key for tool configurations
const TOOL_CONFIG_STORAGE_KEY = "excalidraw-tool-configs";

// Load tool configurations from localStorage
export const loadToolConfigs = (): Record<string, { link?: string; apiKey?: string }> => {
  try {
    const stored = localStorage.getItem(TOOL_CONFIG_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Failed to load tool configs:", e);
    return {};
  }
};

// Save tool configurations to localStorage
export const saveToolConfigs = (configs: Record<string, { link?: string; apiKey?: string }>) => {
  try {
    localStorage.setItem(TOOL_CONFIG_STORAGE_KEY, JSON.stringify(configs));
  } catch (e) {
    console.error("Failed to save tool configs:", e);
  }
};

interface ToolboxSidebarProps {
  app: AppClassProperties;
  onToolSelect: (tool: ToolItem) => void;
}

export const ToolboxSidebar = ({ app, onToolSelect }: ToolboxSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) {
      return TOOLS;
    }
    const query = searchQuery.toLowerCase();
    return TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  const handleDragStart = (e: React.DragEvent, tool: (typeof TOOLS)[number]) => {
    e.dataTransfer.setData("text/plain", tool.image);
    
    e.dataTransfer.setData(
      "application/vnd.stackmap.toolbox-item",
      JSON.stringify(tool),
    );
    // Setting effectAllowed to copy to signal it's a copy operation
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleToolClick = (e: React.MouseEvent, tool: (typeof TOOLS)[number]) => {
    onToolSelect(tool);
    
    if (e.shiftKey) {
      return;
    }
    fetch(tool.image)
      .then((res) => res.blob())
      .then((blob) => {
        if ("addFiles" in app) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(new File([blob], `${tool.name}.png`, { type: "image/png" }));
          
          dataTransfer.setData(
            "application/vnd.stackmap.toolbox-item",
            JSON.stringify(tool),
          );

          const event = new DragEvent("drop", {
            bubbles: true,
            cancelable: true,
            clientX: app.state.width / 2,
            clientY: app.state.height / 2,
            dataTransfer
          });
          app.interactiveCanvas?.dispatchEvent(event);
        }
      });
  };

  return (
    <div className="toolbox-sidebar">
      <div className="toolbox-header">
        <h3>Toolbox</h3>
        <div className="toolbox-search">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="toolbox-search-input"
          />
        </div>
      </div>
      <div className="toolbox-grid">
        {filteredTools.map((tool) => {
          return (
            <div
              key={tool.name}
              className="toolbox-item"
              style={{
                backgroundColor: tool.color,
                color: tool.color ? "#fff" : undefined,
              }}
              onClick={(e) => handleToolClick(e, tool)}
              onContextMenu={(e) => {
                e.preventDefault();
                onToolSelect(tool);
              }}
              onDragStart={(e) => handleDragStart(e, tool)}
              draggable
              title={tool.name}
            >
              <img
                src={tool.image}
                alt={tool.name}
                className="toolbox-icon"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          );
        })}
        {filteredTools.length === 0 && (
          <div className="toolbox-no-results">
            No tools found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};
