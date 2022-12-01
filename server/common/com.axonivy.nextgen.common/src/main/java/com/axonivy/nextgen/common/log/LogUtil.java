package com.axonivy.nextgen.common.log;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.core.appender.ConsoleAppender;
import org.apache.logging.log4j.core.config.Configurator;
import org.apache.logging.log4j.core.config.builder.api.AppenderComponentBuilder;
import org.apache.logging.log4j.core.config.builder.api.ConfigurationBuilder;
import org.apache.logging.log4j.core.config.builder.api.ConfigurationBuilderFactory;
import org.apache.logging.log4j.core.config.builder.api.LayoutComponentBuilder;
import org.apache.logging.log4j.core.config.builder.api.RootLoggerComponentBuilder;
import org.apache.logging.log4j.core.config.builder.impl.BuiltConfiguration;

public final class LogUtil {
	private LogUtil() {
	}

	public static void configure(boolean logToConsole, Level logLevel) {
		ConfigurationBuilder<BuiltConfiguration> builder = ConfigurationBuilderFactory.newConfigurationBuilder();

		// Configure new root logger
		RootLoggerComponentBuilder rootLogger = builder.newRootLogger(logLevel);

		// Configure pattern layout
		LayoutComponentBuilder patternLayout = builder.newLayout("PatternLayout").addAttribute("pattern",
				"%d{DEFAULT_NANOS} [%t] %-5level %logger{1} - %msg%n");

		// Configure console logging
		if (logToConsole) {
			AppenderComponentBuilder consoleAppender = builder.newAppender("ConsoleLogger", "CONSOLE")
					.addAttribute("target", ConsoleAppender.Target.SYSTEM_OUT).add(patternLayout);
			builder.add(consoleAppender);
			rootLogger.add(builder.newAppenderRef("ConsoleLogger"));
		}

		// Add root logger and reconfigure to use created configuration
		builder.add(rootLogger);
		Configurator.reconfigure(builder.build());

		// adapt logging for Jetty in the Websocket case
		Configurator.setLevel("org.eclipse.jetty", logLevel);
	}
}
